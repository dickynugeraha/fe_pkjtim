import { FC } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { BuilderPage } from "./BuilderPage";

const BuilderPageWrapper: FC = () => {
  return (
    <>
      <PageTitle icon="home" breadcrumbs={[]}>
        Layout Builder
      </PageTitle>
      <BuilderPage />
    </>
  );
};

export default BuilderPageWrapper;
