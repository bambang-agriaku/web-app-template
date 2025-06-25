import { black } from "@/config/colors";
import { Stack, Typography } from "@mui/material";
import EmptyDatagrid from "@/public/images/empty_datagrid.svg";

const DEFAULT_HEIGHT = "500px";
const DEFAULT_LABEL = "Data yang kamu cari tidak ada";
const DEFAULT_DESCRIPTION = "Yuk, coba cari dengan kata kunci yang lainnya";
const DEFAULT_IMAGE = EmptyDatagrid;

type Props = {
  label?: string;
  height?: string;
  description?: string;
  image?: string;
  imageSize?: number;
};

export const EmptyView = ({
  label = DEFAULT_LABEL,
  height = DEFAULT_HEIGHT,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  imageSize = 220,
}: Props) => {
  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        height,
      }}
    >
      <img src={image} alt="empty-datagrid" height={imageSize} />
      <Stack
        sx={{
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography fontWeight={700} variant="title3" color={black[500]}>
          {label}
        </Typography>
        <Typography variant="title4" color={black[500]}>
          {description}
        </Typography>
      </Stack>
    </Stack>
  );
};
