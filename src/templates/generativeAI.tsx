import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  StaticTemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import {
  SearchHeadlessProvider,
  provideHeadless,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import { SearchBar, onSearchFunc } from "@yext/search-ui-react";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import SearchResultsSection from "../components/SearchResultsSection";
import Footer from "../components/footer";
import Header from "../components/header";
import searchConfig from "../components/searchConfig";
import "../index.css";
import { cn } from "../utils/cn";

export const config: StaticTemplateConfig = {
  // The name of the feature. If not set the name of this file will be used (without extension).
  // Use this when you need to override the feature name.
  name: "Hyundai AI",
};
export const getPath: GetPath<TemplateProps> = () => {
  return `index.html`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Search & Chat",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

function Inner() {
  const searchActions = useSearchActions();
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch: onSearchFunc = (searchEventData) => {
    setHasSearched(true);
    const { query } = searchEventData;
    searchActions.executeUniversalQuery();
    const queryParams = new URLSearchParams(window.location.search);

    if (query) {
      queryParams.set("query", query);
    } else {
      queryParams.delete("query");
    }
    history.pushState(null, "", "?" + queryParams.toString());
  };

  return (
    <div className="centered-container">
      <SearchBar
        onSearch={handleSearch}
        placeholder="Ask a question..."
        customCssClasses={{ searchBarContainer: "my-4" }}
      />
      {!isLoading && (
        <section
          className={cn("flex flex-col gap-10", !hasSearched && "hidden")}
        >
          <SearchResultsSection />
        </section>
      )}
    </div>
  );
}

const GenerativeAI = ({ document }: TemplateProps) => {
  const { _site } = document;

  return (
    <>
      <SearchHeadlessProvider searcher={provideHeadless(searchConfig)}>
        <AnimatePresence>
          <Inner />
        </AnimatePresence>
      </SearchHeadlessProvider>
    </>
  );
};

export default GenerativeAI;
