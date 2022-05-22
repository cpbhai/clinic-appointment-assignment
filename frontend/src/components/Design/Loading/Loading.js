import { Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100%",
          zIndex: "3",
          position: "absolute",
          background: "rgba(0, 0, 0, 0.3)",
          display: "flex",
        }}
      >
        <Spinner
          size="xl"
          color="#fff"
          sx={{
            margin: "40vh auto 0 auto",
          }}
        />
      </div>
    </>
  );
};

export default Loading;
