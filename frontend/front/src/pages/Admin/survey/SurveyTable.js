import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { React, useMemo } from "react";
import { useGetSurveyVisitsQuery } from "../../../api/apiSlice";
import { formatISODate } from "../../../components/DateUtils";
import Loader from "../../../components/Loader";
import {
  useGoToBreadcrumb,
  useInitBreadcrumbs,
} from "../../../hooks/breadcrumbHooks";
import { ADMIN_SURVEY, withAdminPrefix } from "../../../routing/routes";
import { SurveyError } from "./SurveyError";

const COLUMNS = [
  {
    field: "id",
    headerName: "Survey ID",
    minWidth: 50,
    flex: 0.7,
  },
  {
    field: "home_address",
    headerName: "Address",
    minWidth: 150,
    flex: 1.5,
  },
  { field: "city", headerName: "City", minWidth: 100, flex: 1.2 },
  {
    field: "surveyor",
    headerName: "Surveyor",
    minWidth: 100,
    flex: 1.2,
  },
  {
    field: "created",
    headerName: "Created",
    minWidth: 155,
    flex: 1.5,
  },
];

const SurveyTable = () => {
  const goToBreadcrumb = useGoToBreadcrumb();

  useInitBreadcrumbs(
    [{ url: withAdminPrefix(ADMIN_SURVEY), description: "surveys" }],
    true
  );

  const {
    data: surveyVisitsData,
    error: surveyVisitsError,
    isLoading: surveyVisitsLoading,
  } = useGetSurveyVisitsQuery();

  const addressFormatter = (homeData) => {
    if (!homeData?.unit_number || homeData?.unit_number === "") {
      return `${homeData?.street_number} ${homeData?.street_name}`;
    } else {
      return `${homeData?.street_number} ${homeData?.street_name} Unit ${homeData?.unit_number}`;
    }
  };

  const tableData = useMemo(
    () =>
      surveyVisitsData?.map((survey) => {
        const surveyorName = survey.surveyor_id
          ? `${survey?.surveyor?.firstname ?? ""} ${
              survey?.surveyor?.lastname ?? ""
            }`
          : "Public Submission";
        return {
          id: survey?.id,
          home_address: addressFormatter(survey?.home),
          city: survey?.home?.city,
          surveyor: surveyorName,
          created: formatISODate(survey?.created_at),
        };
      }) || [],
    [surveyVisitsData]
  );

  const onRowClick = (row) => {
    goToBreadcrumb("surveyVisit", row.row);
  };

  if (surveyVisitsLoading) {
    return <Loader />;
  }

  if (surveyVisitsError) {
    return <SurveyError />;
  }
  return (
    <DataGrid
      rows={tableData}
      columns={COLUMNS}
      pageSize={20}
      rowsPerPageOptions={[20]}
      disableSelectionOnClick
      autoHeight
      onRowClick={onRowClick}
      disableColumnFilter
      disableDensitySelector
      disableColumnsMenu
      slots={{ toolbar: GridToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
      }}
    />
  );
};
export default SurveyTable;
