import ReturnButton from "./return-button";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <p>Żądane zasoby nie istnieją!</p>
      <ReturnButton />
    </div>
  )
}

export default ErrorPage;