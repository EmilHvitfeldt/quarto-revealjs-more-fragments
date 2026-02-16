-- More Fragments Lua filter
-- Adds CSS and JS for additional fragment animations
-- Supports header animations, whole-slide animations, and letter-by-letter animations

-- Helper function to check if a class is an animation class
local function is_animation_class(cls)
  return cls:match('^bounce') or cls:match('^fade') or cls:match('^flip') or
         cls:match('^slide') or cls:match('^zoom') or cls:match('^rotate') or
         cls:match('^back') or cls:match('^light') or cls:match('^jack') or
         cls:match('^roll') or cls:match('^hinge') or cls:match('^pulse') or
         cls:match('^rubber') or cls:match('^shake') or cls:match('^head') or
         cls:match('^swing') or cls:match('^tada') or cls:match('^wobble') or
         cls:match('^jello') or cls:match('^heart') or cls:match('^flash')
end

-- Helper function to check if a class is a speed class
local function is_speed_class(cls)
  return cls == 'slower' or cls == 'slow' or cls == 'fast' or cls == 'faster'
end

-- Check if a class is fragment-related
local function is_fragment_class(cls)
  return cls == 'fragment' or cls == 'fragment-slide' or
         is_animation_class(cls) or is_speed_class(cls)
end

-- Helper function to check if a class is a letter speed class
local function is_letter_speed_class(cls)
  return cls == 'letter-faster' or cls == 'letter-fast' or
         cls == 'letter-slow' or cls == 'letter-slower'
end

-- Extract fragment classes from a list
local function extract_fragment_classes(classes)
  local fragment_classes = pandoc.List({})
  local keep_classes = pandoc.List({})

  for _, cls in ipairs(classes) do
    if cls == 'fragment-slide' then
      fragment_classes:insert('fragment')
    elseif is_fragment_class(cls) then
      fragment_classes:insert(cls)
    else
      keep_classes:insert(cls)
    end
  end

  return fragment_classes, keep_classes
end

-- Process a Span element for letter-by-letter animation
local function process_letter_span(el)
  -- Check if span has fragment-letters class
  local has_fragment_letters = false
  for _, cls in ipairs(el.classes) do
    if cls == 'fragment-letters' then
      has_fragment_letters = true
      break
    end
  end

  if not has_fragment_letters then
    return nil
  end

  -- Extract animation, speed, and letter-speed classes
  local animation_class = nil
  local speed_class = nil
  local letter_speed = nil
  local other_classes = pandoc.List({})

  for _, cls in ipairs(el.classes) do
    if cls == 'fragment-letters' then
      -- skip, we'll add 'fragment' and 'letter-fragment' to each letter
    elseif is_animation_class(cls) then
      animation_class = cls
    elseif is_speed_class(cls) then
      speed_class = cls
    elseif is_letter_speed_class(cls) then
      letter_speed = cls
    else
      other_classes:insert(cls)
    end
  end

  -- Get text content
  local text = pandoc.utils.stringify(el.content)

  -- Skip if empty
  if text == '' then
    return nil
  end

  -- Split into characters and create spans
  local letter_spans = pandoc.List({})
  local letter_index = 0

  -- Iterate through UTF-8 characters
  for char in text:gmatch('[%z\1-\127\194-\244][\128-\191]*') do
    if char == ' ' then
      -- Preserve spaces but don't animate them
      letter_spans:insert(pandoc.Space())
    else
      -- Build classes for this letter (no .fragment - container handles that)
      local classes = pandoc.List({'letter-char'})
      if animation_class then classes:insert(animation_class) end
      if speed_class then classes:insert(speed_class) end

      -- Build attributes
      local attrs = {
        ['data-letter-index'] = tostring(letter_index)
      }

      local span = pandoc.Span({pandoc.Str(char)}, pandoc.Attr('', classes, attrs))
      letter_spans:insert(span)
      letter_index = letter_index + 1
    end
  end

  -- Wrap in container span - container is the fragment
  local container_classes = pandoc.List({'fragment', 'letter-container'})
  if animation_class then container_classes:insert(animation_class) end
  if letter_speed then container_classes:insert(letter_speed) end
  for _, cls in ipairs(other_classes) do
    container_classes:insert(cls)
  end

  return pandoc.Span(letter_spans, pandoc.Attr('', container_classes, el.attributes))
end

-- Process the entire document
local function process_doc(doc)
  local new_blocks = pandoc.List({})
  local i = 1
  local blocks = doc.blocks

  while i <= #blocks do
    local block = blocks[i]

    -- Check if this is a header with fragment-slide
    if block.t == 'Header' then
      local has_fragment_slide = false
      for _, cls in ipairs(block.classes) do
        if cls == 'fragment-slide' then
          has_fragment_slide = true
          break
        end
      end

      if has_fragment_slide then
        -- Extract fragment classes
        local fragment_classes, keep_classes = extract_fragment_classes(block.classes)

        -- Use fragment-index 0 to sync header and content animations
        local header_attrs = {["data-fragment-index"] = "0"}
        local content_attrs = {["data-fragment-index"] = "0"}

        -- Wrap header content in a span with fragment classes
        local header_span = pandoc.Span(block.content, pandoc.Attr("", fragment_classes, header_attrs))
        local new_header = pandoc.Header(
          block.level,
          {header_span},
          pandoc.Attr(block.identifier, keep_classes, block.attributes)
        )
        new_blocks:insert(new_header)
        i = i + 1

        -- Collect all content until next header of same or higher level
        local slide_content = pandoc.List({})

        while i <= #blocks do
          local next_block = blocks[i]
          -- Stop at next slide-level header (level 1 or 2)
          if next_block.t == 'Header' and next_block.level <= 2 then
            break
          end
          slide_content:insert(next_block)
          i = i + 1
        end

        -- Wrap slide content in a fragment Div with same classes and index
        if #slide_content > 0 then
          local wrapper = pandoc.Div(slide_content, pandoc.Attr("", fragment_classes, content_attrs))
          new_blocks:insert(wrapper)
        end
      else
        -- Check for fragment-letters on header
        local has_fragment_letters = false
        for _, cls in ipairs(block.classes) do
          if cls == 'fragment-letters' then
            has_fragment_letters = true
            break
          end
        end

        if has_fragment_letters then
          -- Process header text as letter-by-letter animation
          local text = pandoc.utils.stringify(block.content)

          -- Extract animation and speed classes
          local animation_class = nil
          local speed_class = nil
          local letter_speed = nil
          local keep_classes = pandoc.List({})

          for _, cls in ipairs(block.classes) do
            if cls == 'fragment-letters' then
              -- skip
            elseif is_animation_class(cls) then
              animation_class = cls
            elseif is_speed_class(cls) then
              speed_class = cls
            elseif is_letter_speed_class(cls) then
              letter_speed = cls
            else
              keep_classes:insert(cls)
            end
          end

          -- Split into characters and create spans
          local letter_spans = pandoc.List({})
          local letter_index = 0

          for char in text:gmatch('[%z\1-\127\194-\244][\128-\191]*') do
            if char == ' ' then
              letter_spans:insert(pandoc.Space())
            else
              local classes = pandoc.List({'letter-char'})
              if animation_class then classes:insert(animation_class) end
              if speed_class then classes:insert(speed_class) end

              local attrs = {
                ['data-letter-index'] = tostring(letter_index)
              }

              local span = pandoc.Span({pandoc.Str(char)}, pandoc.Attr('', classes, attrs))
              letter_spans:insert(span)
              letter_index = letter_index + 1
            end
          end

          -- Create container span
          local container_classes = pandoc.List({'fragment', 'letter-container'})
          if animation_class then container_classes:insert(animation_class) end
          if letter_speed then container_classes:insert(letter_speed) end

          local container = pandoc.Span(letter_spans, pandoc.Attr('', container_classes, {}))
          block.content = {container}
          block.classes = keep_classes

          new_blocks:insert(block)
          i = i + 1
        else
          -- Check for header-only fragment
          local has_fragment = false
          for _, cls in ipairs(block.classes) do
            if cls == 'fragment' then
              has_fragment = true
              break
            end
          end

          if has_fragment then
            local fragment_classes, keep_classes = extract_fragment_classes(block.classes)
            block.classes = keep_classes
            local wrapped_content = pandoc.Span(block.content, pandoc.Attr("", fragment_classes, {}))
            block.content = {wrapped_content}
          end

          new_blocks:insert(block)
          i = i + 1
        end
      end
    else
      new_blocks:insert(block)
      i = i + 1
    end
  end

  -- Add dependencies
  if quarto then
    quarto.doc.add_html_dependency({
      name = "more-fragments",
      version = "0.1.0",
      stylesheets = {"animate.min.css", "more-fragments.css"},
      scripts = {"more-fragments.js"}
    })
  end

  return pandoc.Pandoc(new_blocks, doc.meta)
end

-- Return as a Pandoc filter with Span processing first
return {
  -- First pass: process letter-by-letter spans
  {
    Span = process_letter_span
  },
  -- Second pass: process headers and document structure
  {
    Pandoc = process_doc
  }
}
