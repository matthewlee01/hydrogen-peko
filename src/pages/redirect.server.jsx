export default function Redirect({response}) {
  response.redirect('/');
  return <div>This page is redirected</div>;
}
