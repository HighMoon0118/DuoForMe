## React

### 1. JSX

- 자바스크립트의 확장 문법으로 XML과 비슷
- 브라우저에서 실행되기 전 코드가 번들링 되는 과정에서 일반 자바스크립트 형태의 코드로 변환
- React에서 JSX 사용이 필수가 아니지만 가독성이 좋아서 대부분 JSX를 사용

- JSX 규칙

  - 여러 개의 요소는 부모 요소 하나로 감싸져야 한다.(컴포넌트 내부는 하나의 DOM 트리 구조로 이루어져야 하기 때문)

    ```jsx
    const element = (
      <div>
        <h1>Hello!</h1>
        <h2>Good to see you here.</h2>
      </div>
    );
    ```

    이런식으로!
    - div 요소로 감싸고 싶지 않을 경우에는 Fragment 사용
    - import {Fragment} from 'react' 후 <Fragment></Fragment> 또는 <></>

  - 표현식 

    - {} 사용
    - 중괄호 안에는 유효한 자바스크립트 표현식 넣을 수 있음

  - 속성 정의

    - 따옴표(문자열 값) 또는 중괄호(표현식) 사용 => 두 가지 동시 사용X

  - 스타일, 클래스 등

    - camelCase로 작성
    - class => className, background-color => backgroundColor

  - 태그

    - 꼭 닫아야 함!!
    - br, input과 같이 열기만 하는 태그를 그냥 사용하면  오류 발생 
    - <input></input> 또는 <input />(self-closing) 사용

  - 주석
    - {/* 주석 */}
    - 시작 태그를 여러 줄로 작성하면 거기에 // 로 주석을 작성할 수 있다.



### 2. 엘리먼트 렌더링

- 엘리먼트 : React앱의 가장 작은 단위로 화면에 표시할 내용 기술

- React로 구현된 애플리케이션은 일반적으로 하나의 루트 DOM 노드 존재

- React 엘리먼트를 루트 DOM 노드에 렌더링하려면 둘 다 ReactDOM.render()로 전달

  ```jsx
  const element = <h1>Hello, world</h1>;
  ReactDOM.render(element, document.getElementById('root'));
  ```

- React DOM은 해당 엘리먼트와 그 자식 엘리먼트를 이전의 엘리먼트와 비교하고 DOM을 원하는 상태로 만드는데 필요한 경우에만 DOM을 업데이트



### 3. Components와 Props

- 함수 컴포넌트, 클래스형 컴포넌트로 선언 가능

  - 함수

    ```jsx
    function Welcome(props) {
      return <h1>Hello, {props.name}</h1>;
    }
    ```

  - 클래스

    ```jsx
    class Welcome extends React.Component {
      render() {
        return <h1>Hello, {this.props.name}</h1>;
      }
    }
    ```

- 클래스형 컴포넌트 : state 기능 및 라이프사이클 기능을 사용할 수 있고 임의 메서드 정의 가능

  ​									render함수 필수로 있어야 하고 그 안에서 보여주어야 하는 JSX 반환

- 함수 컴포넌트 : 클래스형보다 선언이 편하며 메모리 자원을 덜 사용(굳이 신경쓸 필요는 없음)

  ​		 						  state와 라이프사이클 API 사용 불가 => Hooks로 비슷한 작업 가능

>리액트의 함수형 컴포넌트 지지다. 리액트 팀은 컴포넌트의 더 간결한 함수형 스타일이 인터페이스 아키텍처의 규모가 커질수록 더 복합적인 이점을 제공한다는 점에 주목했다.
>
>['깔끔한 코드 체계의 기초' 함수형 프로그래밍의 이해 - ITWorld Korea](https://www.itworld.co.kr/news/189028)

- 컴포넌트 렌더링

  ```jsx
  const element = <Welcome name="Sara" />;
  ```

  ```name="Sara" ```는 props로 전달됨

  컴포넌트는 항상 **대문자**로 시작!!!

  props의 이름은 사용될 context가 아닌 **컴포넌트 자체 관점**에서 짓는 걸 추천

  props는 읽기만 가능(단방향 데이터)

  디폴트 값 설정해줄때는 컴포넌트이름.defaultProps = { value : '디폴트' } 이런 식으로 만들기

  ```<Welcome>props</Welcome>```

  이렇게 태그 사이에 있는 문자를 Welcome 내부에서 보여주고 싶을 때는 props.children으로 접근

  props 받을 때 객체라면 **비구조화**를 이용할 수 있음!

  **props-type**을 import 해서 타입 지정할 수 있음(받아야 하는 값 타입 지정) => 다른 타입이어도 보이긴 하지만 콘솔에 에러메시지

  type 쓸 때 **isRequired**로 필수로 입력받아야 하는 값 설정 가능 => 안 그러면 콘솔에 경고

  defaultProps와 propsType은 필수가 아님 => 하지만 협업을 한다면 해당 컴포넌트에 어떤 props가 필요한지 알기 편함



### 4. State와 생명주기

- state는 컴포넌트 내부에서 바뀔 수 있는 값으로 비공개이며 컴포넌트에 의해 제어

- 함수 컴포넌트에서는 state를 사용할 수 없음

- 컴포넌트에 state를 설정할 때는 **constructor** 메서드를 작성하여 설정

  ```jsx
  constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  ```

  - 클래스형 컴포넌트에서 constructor 작성할 때는 super(props)를 호출해주어야 함 => 호출되면 현재 클래스형 컴포넌트가 상속받고 있는 리액트의 컴포넌트 글래스가 지닌 생성자 함수를 호출 (안 써주면 this.props가 undefined)
  - this.state로 초기값 설정 => 객체 형식이어야 함

- **componentDidMount()** => 컴포넌트 출력물이 DOM에 렌더링 된 후 실행

- **componentWillUnmount()** => 컴포넌트를 DOM에서 제거하는 것

- **this.setState()** => 컴포넌트 로컬 state 업데이트 할 때 사용 => state 값을 업데이트 할 때 상태가 **비동기적**으로 업데이트 => **동기적**으로 하고 싶으면 this.setState 내에 객체 대신 **함수를 인자**로 사용



### 5. 이벤트 처리하기

- camelCase 사용

- JSX를 사용하여 문자열이 아닌 함수로 이벤트 핸들러 전달

  ```jsx
  <button onClick={this.handleClick}></button>
  ```

- 기본 동작을 방지하려면 preventDefault 명시적으로 호출해야 함

- DOM 요소에만 이벤트를 설정할 수 있음(div, button과 같은 곳에만 설정 가능, 컴포넌트에 자체적으로 이벤트 설정할 수 없음)

- this가 작동하게 하기 위해서는 constructor에 바인딩 해줘야 함 ex) ```this.handleClick = this.handleClick.bind(this);```

- 이벤트 핸들러에 인자 전달을 하는 방법은 ```화살표 함수```와 ```Function.prototype.bind```를 사용

  ```jsx
  <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
  <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
  ```

  

### 6. 조건부 렌더링

- 원하는 동작을 캡슐화하는 컴포넌트를 만들 수 있음 => 상태에 따라 렌더링하는 컴포넌트가 달라지게

- if문

  ```jsx
  render() {
      const isLoggedIn = this.state.isLoggedIn;
      let button;
      if (isLoggedIn) {
        button = <LogoutButton onClick={this.handleLogoutClick} />;
      } else {
        button = <LoginButton onClick={this.handleLoginClick} />;
      }
  
      return (
        <div>
          <Greeting isLoggedIn={isLoggedIn} />
          {button}
        </div>
      );
    }
  ```

- 논리 연산자(&&)

  ```jsx
  function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
      <div>
        <h1>Hello!</h1>
        {unreadMessages.length > 0 &&
          <h2>
            You have {unreadMessages.length} unread messages.
          </h2>
        }
      </div>
    );
  }
  ```

  ``` <h2>You have {unreadMessages.length} unread messages.</h2>```가 항상 true이므로 unreadMessage.length값에 따라 렌더링 됨

  false로 평가될 수 있는 표현식을 반환하는 것 주의해야 함! 밑에 예시에서 ```<div>0</div>``` 가 반환

  ```jsx
  render() {
    const count = 0;  return (
      <div>
        { count && <h1>Messages: {count}</h1>}    
      </div>
    );
  }
  ```

- 조건부 연산자

  ```condition ? true : false```  사용 가능

- 조건에 따라 컴포넌트를 랜더링 하고 싶지 않을 때는 ```return null``` 사용



***

참고자료

- [시작하기 – React (reactjs.org)](https://ko.reactjs.org/docs/getting-started.html)

- 리액트를 다루는 기술

