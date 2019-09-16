import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  Dimensions,
  ImageBackground
} from "react-native";

const { height, width } = Dimensions.get("window");

const rspCoords = {
  바위: "바위",
  가위: "가위",
  보: "보"
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1
};

const computerChoice = imgCoord => {
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
};

class RSP extends React.Component {
  state = {
    result: "",
    imgCoord: rspCoords.바위,
    score: 0
  };

  interval;

  changeHand = () => {
    const { imgCoord } = this.state;
    if (imgCoord === rspCoords.바위) {
      this.setState({
        imgCoord: rspCoords.가위
      });
    } else if (imgCoord === rspCoords.가위) {
      this.setState({
        imgCoord: rspCoords.보
      });
    } else if (imgCoord === rspCoords.보) {
      this.setState({
        imgCoord: rspCoords.바위
      });
    }
  };

  changeImage = () => {
    if (this.state.imgCoord === rspCoords.바위) {
      return require(".././img/rock.png");
    } else if (this.state.imgCoord === rspCoords.가위) {
      return require(".././img/scissors.png");
    } else if (this.state.imgCoord === rspCoords.보) {
      return require(".././img/paper.png");
    }
  };

  componentDidMount() {
    this.interval = setInterval(this.changeHand, 100);
  } // 컴포넌트가 첫 랜더링한 후 실행, 비동기 요청을 많이함

  // componentDidUpdate() {
  //
  // } // 리랜더링 후 실행(부모가 없앴을때?)

  componentWillUnmount() {
    clearInterval(this.interval);
  } // 컴포넌트가 제거되기 직전 실행, 비동기 요청 정리를 많이함

  onClickBtn = choice => () => {
    const { imgCoord } = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: "비겼습니다."
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
      this.interval = setInterval(this.changeHand, 100);
    }, 2000);
  };

  render() {
    // width: width,
    // height: height / 2
    const { result, score } = this.state;
    return (
      <React.Fragment>
        <View
          style={{
            flex: 3,
            alignItems: "center"
          }}
        >
          <Image
            source={this.changeImage()}
            style={{
              width: width / 2,
              height: height / 2
            }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <View style={{ flex: 1 }}>
            <Button
              title="바위"
              onPress={this.onClickBtn("바위")}
              color={"#DE5A4A"}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="가위"
              onPress={this.onClickBtn("가위")}
              color={"#F1C41C"}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="보"
              onPress={this.onClickBtn("보")}
              color={"#8BAC3D"}
            />
          </View>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>결과는 : {result}</Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>현재 {score}점</Text>
        </View>
      </React.Fragment>
    );
  }
}
export default RSP;

const styles = StyleSheet.create({
  containter: {
    flex: 1
  }
});
