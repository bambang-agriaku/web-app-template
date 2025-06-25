import { Box, CircularProgress, Typography } from "@mui/material";
import { type MRT_RowData, type MRT_TableOptions } from "material-react-table";

import { black } from "@/config/colors";
import { EmptyView } from "@/components/ui/table/empty-view";

const LoadingComponent = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <CircularProgress
        {...{
          size: 40,
          color: "primary",
          thickness: 4,
        }}
      />
      <Typography mt={2} color={black[900]}>
        Sedang memuat halaman..
      </Typography>
    </Box>
  );
};

//define re-useable default table options for all tables in your app
export const getDefaultMRTOptions = <TData extends MRT_RowData>(): Partial<
  MRT_TableOptions<TData>
> => ({
  //list all of your default table options here
  enableTopToolbar: false,
  enableGlobalFilter: false,
  defaultColumn: {
    enableSorting: false,
    enableColumnActions: false,
  },
  manualPagination: true,
  manualSorting: true,
  enableMultiSort: false,
  muiTableHeadCellProps: {
    sx: {
      backgroundColor: black[100],
      height: 56,
      verticalAlign: "middle",
    },
  },
  muiTablePaperProps: {
    elevation: 0,
    sx: {
      width: "calc(100vw - 360px)",
      border: `1px solid ${black[200]}`,
      borderRadius: "8px",
    },
  },
  muiPaginationProps: {
    rowsPerPageOptions: [10, 25, 50, 100],
  },
  renderEmptyRowsFallback: () => <EmptyView />,
  muiCircularProgressProps: {
    Component: <LoadingComponent />,
  },
});
