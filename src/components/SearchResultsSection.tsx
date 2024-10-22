import {
  GenerativeDirectAnswer,
  StandardCard,
  UniversalResults,
} from "@yext/search-ui-react";
import FAQCard from "./cards/FAQCard";
const GridSection3Col = ({ results, CardComponent, header }: any) => {
  if (!CardComponent) {
    return <div>Missing Card Component</div>;
  }
  return (
    <div>
      <div>{header}</div>
      <div className="grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-8 ">
        {results.map((r: any, index: number) => (
          <CardComponent key={index} result={r} />
        ))}
      </div>
    </div>
  );
};
const hiddenGrid = ({ results, CardComponent, header }: any) => {
  if (!CardComponent) {
    return <div>Missing Card Component</div>;
  }
  return (
    <div className="hidden">
      <div>{header}</div>
      <div className="grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-8 ">
        {results.map((r: any, index: number) => (
          <CardComponent key={index} result={r} />
        ))}
      </div>
    </div>
  );
};
const SearchResultsSection = () => {
  return (
    <div
      className="mx-auto flex min-h-[75vh] w-full flex-col gap-6 "
      id="results"
    >
      <GenerativeDirectAnswer />
      <UniversalResults
        showAppliedFilters={true}
        customCssClasses={{
          universalResultsContainer: "w-full mx-auto my-6 ",
        }}
        verticalConfigMap={{
          help_articles: {
            CardComponent: StandardCard,
            viewAllButton: true,
            label: "Help Articles",
          },
          faqs: {
            CardComponent: FAQCard,
            viewAllButton: true,
            label: "FAQs",
          },

          products: {
            CardComponent: StandardCard,
            SectionComponent: GridSection3Col,
            label: "Products",
            viewAllButton: true,
          },

          locations: {
            CardComponent: StandardCard,
            SectionComponent: hiddenGrid,
            viewAllButton: false,
          },
        }}
      />
    </div>
  );
};

export default SearchResultsSection;
