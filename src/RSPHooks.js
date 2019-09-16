import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  Button
} from "react-native";

const { height, width } = Dimensions.get("window");

const scores = {
  가위: 1,
  바위: 0,
  보: -1
};

const RSP = () => {
  const [result, setResult] = useState("");
  const [currentRsp, setCurrentRsp] = useState("바위");
  const [score, setScore] = useState(0);
  const interval = useRef();

  const changeRSP = () => {
    if (currentRsp === "바위") {
      setCurrentRsp("가위");
    } else if (currentRsp === "가위") {
      setCurrentRsp("보");
    } else if (currentRsp === "보") {
      setCurrentRsp("바위");
    }
  };

  const changeImage = () => {
    if (currentRsp === "바위") {
      return require(".././img/rock.png");
    } else if (currentRsp === "가위") {
      return require(".././img/scissors.png");
    } else if (currentRsp === "보") {
      return require(".././img/paper.png");
    }
  };

  const onPressBtn = press => () => {
    clearInterval(interval.current);

    const myScore = scores[press];
    const cpuScore = scores[currentRsp];

    const diff = myScore - cpuScore;

    if (diff === 0) {
      setResult("비겼습니다");
    } else if ([-1, 2].includes(diff)) {
      setResult("이겼습니다");
      setScore(prevScore => {
        return prevScore + 1;
      });
    } else {
      setResult("졌습니다");
      setScore(prevScore => {
        return prevScore - 1;
      });
    }

    setTimeout(() => {
      interval.current = setInterval(changeRSP, 100);
    }, 2000);
  };

  useEffect(() => {
    interval.current = setInterval(changeRSP, 100);
    return () => {
      clearInterval(interval.current);
    };
  }, [currentRsp]);

  return (
    <React.Fragment>
      <View style={{ flex: 3, alignItems: "center" }}>
        <Image
          source={changeImage()}
          style={{ width: width / 2, height: height / 2 }}
          resizeMode="contain"
        />
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Button title="바위" color={"#DE5A4A"} onPress={onPressBtn("바위")} />
        </View>
        <View style={{ flex: 1 }}>
          <Button title="가위" color={"#F1C41C"} onPress={onPressBtn("가위")} />
        </View>
        <View style={{ flex: 1 }}>
          <Button title="보" color={"#8BAC3D"} onPress={onPressBtn("보")} />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text>결과는 : {result}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text>현재 점수는 : {score} 점</Text>
      </View>
    </React.Fragment>
  );
};
export default RSP;
