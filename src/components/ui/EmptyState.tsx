import { Box, Button, Typography } from "@mui/material";

import InboxIcon from "@mui/icons-material/Inbox";

interface EmptyStateProps {
  title: string;
  message: string;
  buttonText?: string;
  onAction?: () => void;
}

const EmptyState = ({
  title,
  message,
  buttonText,
  onAction,
}: EmptyStateProps): React.ReactElement => {
  return (
    <Box
      sx={{
        minHeight: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 3,
      }}
    >
      <InboxIcon
        sx={{
          fontSize: 64,
          color: "text.secondary",
          mb: 2,
        }}
      />

      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        {title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          maxWidth: 400,
          mb: 3,
        }}
      >
        {message}
      </Typography>

      {buttonText && (
        <Button variant="contained" onClick={onAction}>
          {buttonText}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
