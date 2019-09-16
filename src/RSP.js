import React from "react";
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

class RSP extends React.Component {
  state = {
    result: "",
    currentRsp: "바위",
    score: 0
  };

  changeRSP = () => {
    const { currentRsp } = this.state;
    if (currentRsp === "바위") {
      this.setState({
        currentRsp: "가위"
      });
    } else if (currentRsp === "가위") {
      this.setState({
        currentRsp: "보"
      });
    } else if (currentRsp === "보") {
      this.setState({
        currentRsp: "바위"
      });
    }
  };

  interval;

  componentDidMount() {
    this.interval = setInterval(this.changeRSP, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeImage = () => {
    const { currentRsp } = this.state;
    if (currentRsp === "바위") {
      return require(".././img/rock.png");
    } else if (currentRsp === "가위") {
      return require(".././img/scissors.png");
    } else if (currentRsp === "보") {
      return require(".././img/paper.png");
    }
  };

  onPressBtn = press => () => {
    const { currentRsp } = this.state;
    clearInterval(this.interval);

    const myScore = scores[press];
    const cpuScore = scores[currentRsp];

    const diff = myScore - cpuScore;

    if (diff === 0) {
      this.setState({
        result: "비겼습니다"
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState(prevState => {
        return {
          result: "이겼습니다",
          score: prevState.score + 1
        };
      });
    } else {
      this.setState(prevState => {
        return {
          result: "졌습니다.",
          score: prevState.score - 1
        };
      });
    }

    setTimeout(() => {
      this.interval = setInterval(this.changeRSP, 100);
    }, 2000);
  };

  render() {
    const { result, score } = this.state;
    return (
      <React.Fragment>
        <View style={{ flex: 3, alignItems: "center" }}>
          <Image
            source={this.changeImage()}
            style={{ width: width / 2, height: height / 2 }}
            resizeMode="contain"
          />
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Button
              title="바위"
              color={"#DE5A4A"}
              onPress={this.onPressBtn("바위")}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="가위"
              color={"#F1C41C"}
              onPress={this.onPressBtn("가위")}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="보"
              color={"#8BAC3D"}
              onPress={this.onPressBtn("보")}
            />
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
  }
}

export default RSP;
