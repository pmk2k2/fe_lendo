import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as Error | Response;
  const errorTxt = "statusText" in error ? error.statusText : error.message;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorTxt}</i>
      </p>
    </div>
  );
}
