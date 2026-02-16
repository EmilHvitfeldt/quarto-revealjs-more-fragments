-- More Fragments Lua filter
-- Adds CSS and JS for additional fragment animations
-- Also transforms headers with .fragment class to wrap content in a span

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

-- Process headers with fragment classes
function Header(el)
  -- Check if header has fragment class
  local has_fragment = false
  for _, cls in ipairs(el.classes) do
    if cls == 'fragment' then
      has_fragment = true
      break
    end
  end

  if has_fragment then
    -- Collect fragment-related classes for the span
    local fragment_classes = pandoc.List({})
    local keep_classes = pandoc.List({})

    for _, cls in ipairs(el.classes) do
      if cls == 'fragment' or is_animation_class(cls) or is_speed_class(cls) then
        fragment_classes:insert(cls)
      else
        keep_classes:insert(cls)
      end
    end

    -- Update header classes (remove fragment-related)
    el.classes = keep_classes

    -- Wrap header content in a Span with fragment classes
    local wrapped_content = pandoc.Span(el.content, pandoc.Attr("", fragment_classes, {}))
    el.content = {wrapped_content}

    return el
  end
end

-- Add CSS and JS dependencies
function Meta(meta)
  if quarto then
    quarto.doc.add_html_dependency({
      name = "more-fragments",
      version = "0.1.0",
      stylesheets = {"animate.min.css", "more-fragments.css"},
      scripts = {"more-fragments.js"}
    })
  end
  return meta
end
