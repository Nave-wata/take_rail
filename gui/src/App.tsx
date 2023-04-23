import React from "react";
import Header from "./Components/Header";
import { Box, Typography, Grid, TextField, Button } from "@mui/material";

// @TODO 下記のデータは仮のデータなので、実際のデータに置き換える
const stationData = [
  {
    code: "0001",
    name: "京都",
  },
  {
    code: "0002",
    name: "大阪",
  },
  {
    code: "0003",
    name: "兵庫",
  },
];

const StationCheck: any = () => {
  const departurePoint: HTMLElement | null =
    document.getElementById("departure-point");
  const destinationPoint: HTMLElement | null =
    document.getElementById("destination-point");
  const departurePointValue = (departurePoint as HTMLInputElement).value;
  const destinationPointValue = (destinationPoint as HTMLInputElement).value;

  if (departurePointValue === "") {
    alert("出発地が入力されていません");
    return null;
  } else if (destinationPointValue === "") {
    alert("目的地が入力されていません");
    return null;
  } else {
    // @TODO 仮のデータなので、実際のデータに置き換える
    const departurePointCode = stationData.find(
      (station) => station.name === departurePointValue
    )?.code;
    const destinationPointCode = stationData.find(
      (station) => station.name === destinationPointValue
    )?.code;

    if (departurePointCode === undefined) {
      alert("出発地が存在しません");
      return null;
    } else if (destinationPointCode === undefined) {
      alert("目的地が存在しません");
      return null;
    } else {
      alert(
        `出発地：${departurePointValue}(${departurePointCode})、目的地：${destinationPointValue}(${destinationPointCode})`
      );
      return {
        departurePoint: departurePointValue,
        destinationPoint: destinationPointValue,
      };
    }
  }
};

type TransferProps = {
  departurePoint: string;
  destinationPoint: string;
};
const GetBestTransfer = (props: TransferProps) => {
  alert("hi");
  return (
    <>
      <Typography variant="h6">検索結果</Typography>
      <Grid container>
        <Grid item>
          <Typography variant="h6" sx={{ml: 2}}>出発地:</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" sx={{ml: 2}}>{props.departurePoint}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <Typography variant="h6" sx={{ml: 2}}>目的地:</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" sx={{ml: 2}}>{props.destinationPoint}</Typography>
        </Grid>
      </Grid>
    </>
  );
};

const App = () => {
  const [resultDom, setResultDom] = React.useState<any>(null);

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
          <br />
          <TextField id="departure-point" label="出発地" variant="outlined" />
          <br />
          <TextField id="destination-point" label="目的地" variant="outlined" />

          <br />
          <Button
            variant="contained"
            onClick={() => {
              const result = StationCheck();
              setResultDom(
                () => {if (result !== null) {
                   GetBestTransfer(result);
                  } else {
                    return null;
                  }
                }
              );
            }}
          >
            検索
          </Button>

          <br />
          {resultDom}
        </Grid>
      </Box>
    </>
  );
};

export default App;
