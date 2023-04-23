import React from "react";
import Header from "./Components/Header";
import { Box, Typography, Grid, TextField,Button } from "@mui/material";

const App = () => {
  return (
    <>
      <Header />
      <Box sx={{ p: 2 }}>
        <Typography variant="h5">あなたの最短時間を調べよう</Typography>
        <hr />
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          {/* @TODO 文字色変更 */}
          <Typography variant="h6" color="">
            ＊現在は京阪電車のみに対応しています。
          </Typography>
          <TextField id="departure-point" label="出発地" variant="outlined" />
          <br />
          <TextField id="destination-point" label="目的地" variant="outlined" />

          <br />
          <Button variant="contained">検索</Button>
        </Grid>
      </Box>
    </>
  );
};

export default App;
