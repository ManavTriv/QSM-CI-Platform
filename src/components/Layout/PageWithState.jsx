import useProcessedData from "../../hooks/useProcessedData";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSpinner";
import PageLayout from "./PageLayout";

const PageWithState = ({
  children,
  loadingMessage = "Loading data",
  loadingDescription = "Fetching information...",
  errorMessage = "Error loading data",
}) => {
  const { data, error, loading } = useProcessedData();

  if (error) {
    return (
      <PageLayout>
        <ErrorMessage message={errorMessage} />
      </PageLayout>
    );
  }

  if (loading) {
    return (
      <PageLayout>
        <LoadingSpinner
          message={loadingMessage}
          description={loadingDescription}
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {typeof children === "function" ? children(data) : children}
    </PageLayout>
  );
};

export default PageWithState;
