import CompareMessage from "../components/CompareMessage";
import AlgorithmComparison from "../components/AlgorithmComparison";
import PageWithState from "../components/Layout/PageWithState";

const Compare = () => {
  return (
    <PageWithState
      loadingMessage="Loading comparison data"
      loadingDescription="Preparing algorithm comparison..."
    >
      {(data) => (
        <>
          <CompareMessage />
          <AlgorithmComparison data={data} />
        </>
      )}
    </PageWithState>
  );
};

export default Compare;
