import { Hidden } from "@mui/material";
import { Box, styled } from "@mui/system";

const BoxWrapper = styled("div")({
  background: "#5865f2",
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export default (props) => {
  return (
    <BoxWrapper>
      <Box
        sx={{
          background: "#36393f",
          width: "700px",
          height: "400px",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          padding: "3em",
        }}
      >
        {props.children}
      </Box>
    </BoxWrapper>
  );
};
