-- More Fragments Lua filter
-- Adds CSS and JS for additional fragment animations

function Meta(meta)
  -- Add the CSS and JS files to the header
  quarto.doc.add_html_dependency({
    name = "more-fragments",
    version = "0.1.0",
    stylesheets = {"animate.min.css", "more-fragments.css"},
    scripts = {"more-fragments.js"}
  })
  return meta
end
