-- More Fragments Lua filter
-- Adds CSS for additional fragment animations

function Meta(meta)
  -- Add the CSS files to the header
  quarto.doc.add_html_dependency({
    name = "more-fragments",
    version = "0.1.0",
    stylesheets = {"animate.min.css", "more-fragments.css"}
  })
  return meta
end
