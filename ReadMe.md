## 가위바위보 게임 만들기

- [zero cho](https://www.youtube.com/channel/UCp-vBtwvBmDiGqjvLjChaJw) 님의 강의를 React-Native로 Re-build하였습니다.

* class와 hook 버전으로 작성

![screen](./img/application.png)

- requirement : `npm`, `react`, `react-native`, `expo`, `android-studio`

**실행**

`git clone`

`cmd` -> `expo start` -> `android-studio 실행` -> `a`

1. state 및 기본 변수 설정

**class**

```javascript
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

export default RSP;
```

**hooks**

```javascript
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
};

export default RSP;
```

- `scores` : 가위바위보 각각의 unique한 values
- `result` : 가위바위보 승패를 저장
- `currentRsp` : 변하는 가위바위보의 상태
- `score` : 컴퓨터에게 승리시 +1, 패배시 -1

- `class`에서는 `state`로 한번에 관리하지만 `hooks`에서는 `useState`를 사용하여 각각 관리해주어야함

2. Component Return

**class**

```javascript
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

```

`const { result, score } = this.state;` : 구조분해를 하여 `this.state`의 사용을 생략

**hooks**

```javascript
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
```

```
<Image
            source={this.changeImage()}
            style={{ width: width / 2, height: height / 2 }}
            resizeMode="contain"
          />
```

- `changeImage()` 기능에 따라 이미지겨 변화하게 됨

3. 가위바위보 state 변경 설정

**class**

```javascript
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
```

**hooks**

```javascript
const changeRSP = () => {
  if (currentRsp === "바위") {
    setCurrentRsp("가위");
  } else if (currentRsp === "가위") {
    setCurrentRsp("보");
  } else if (currentRsp === "보") {
    setCurrentRsp("바위");
  }
};
```

- 바위 -> 가위 -> 보 순서로 state를 변경
- `hooks`에서는 `setState` 대신 초기에 설정한 state변경 명령어를 사용

4. state 변경에 따라 사용될 이미지 URL

**class**

```javascript
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
```

**hooks**

```javascript
const changeImage = () => {
  if (currentRsp === "바위") {
    return require(".././img/rock.png");
  } else if (currentRsp === "가위") {
    return require(".././img/scissors.png");
  } else if (currentRsp === "보") {
    return require(".././img/paper.png");
  }
};
```

- 각 `state`에 따라 image 변경

5. component life cycle 사용하여 그림이 동적으로 변경되게 하기

- class : componentDidMount, componentWillUnmount
- hooks : useEffect

**class**

```javascript
interval;

  componentDidMount() {
    this.interval = setInterval(this.changeRSP, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
```

**hooks**

```javascript
const interval = useRef();

useEffect(() => {
  interval.current = setInterval(changeRSP, 100);
  return () => {
    clearInterval(interval.current);
  };
}, [currentRsp]);
```

- `hooks`에서는 `component life cycle`함수를 사용할 수 없으므로 `useEffect`를 사용하여 대체한다.

```
useEffect(() => {
  componentDidMount + componentDidUpdate
  return () => {
    componentWillUnmount
  };
}, [변수]); //변수가 변경될때마다 재실행

```

6. onPress 설정 및 승패

**class**

```javascript
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
```

**hooks**

```javascript
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
```

- 초기에 설정한 `scores`의 가위바위보 마다의 unique value를 사용하여 승패 결정

```
setTimeout(() => {
   this.interval = setInterval(this.changeRSP, 100);
 }, 2000);
```

- 승패 확인 시 2초간 대기 후 이미지 변경 재실행
