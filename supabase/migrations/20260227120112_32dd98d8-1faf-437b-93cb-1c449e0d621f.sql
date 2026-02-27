UPDATE public.newsletter_editions 
SET content = REPLACE(
  content, 
  '<p><strong>By Kiera H.</strong><br/>Phresh Phactory TV</p>', 
  '<p><strong>By Kiera H.</strong><br/><a href="https://phreshphactory.com/KieraH" target="_blank">Phresh Phactory, Inc.</a></p>'
)
WHERE slug = 'club-seven-menswear';