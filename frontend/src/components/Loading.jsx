import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Loading Component to display a spinner while content is loading
const Loading = () => {
  return (
    <div className="bg-black w-screen h-screen">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh" // Full viewport height to center the spinner
      >
        {/* Material UI Circular Progress Spinner */}
        <CircularProgress color="primary" />
      </Box>
    </div>
  );
};

export default Loading;
