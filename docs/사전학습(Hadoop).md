## 사전학습(Hadoop)

- 프로젝트 목표
  - 병렬 분산 알고리즘 구현이 가능한 맵리듀스 프레임워크의 이해
  - 맵리듀스 프레임워크를 사용할 수 있는 hadoop설치 및 맵리듀스 알고리즘 코드를 실행
  - hadoop을 이용하여 빅데이터 분석 및 처리용 맵리듀스 알고리즘을 구현하는데 필요한 지식과 코딩능력 배양



### 병렬분산 알고리즘

- scale-out : 아주 많은 값싼 서버들을 이용
- scale-up : 적은 수의 값비싼 서버들을 이용
- 데이터 중심 어플리케이션 분야에서는 scale-out을 선호
  - 왜? 컴퓨터의 성능이 선형으로 증가하는게 아니라서 싼거 2대가 더 이득임
- 데이터 중심 프로세싱(Data-intensice processing)
  - 한 대의 컴퓨터의 능력으로 처리가 어려움
  - 근본적으로 여러 대의 컴퓨터를 묶어서 처리해야함
  - 맵 리듀스(MapReduce) 프레임 워크가 하는 것이 바로 이것
  - 효율적인 계산이 가능한 첫 번째 프로그래밍 모델
    - 기존의 방식은 프로그래머가 낮은 레벨의 시스템 세부 내용까지 알고/ 시간을 쏟아야 했음
-  MapReduce FrameWork
  - 빅 데이터를 이용하는 응용분야에서 최근에 주목 받음
  - 값싼 컴퓨터를 모아서 클러스터를 만들고 여기에서 빅 데이터를 처리하기 위한 스케일러블 병렬 소프트웨어의 구현을 쉽게 할 수 있도록 도와주는 간단한 프로그래밍 모델
    - scalable : 사용자 수가 급증하거나 데이터가 급증해도 프로그램이 멈추거나 성능이 크게 떨어지는 일이 없다는 뜻
  - 구글의 맵리듀스 또는 오픈소스인 하둡은 우수한 구현 형태
  - 드라이버에 해당하는 메인 함수가 맵 함수와 리듀스 함수를 호출해서 처리
  - 각각의 레코드 또는 튜플은 키-밸류 쌍으로 표현
  - 메인 함수를 한 개의 마스터 머신에서 수행하는데 이 머신은 맵 함수를 수행하기 전 전처리를 하거나 리듀스 함수의 결과를 후처리 하는데 사용될 수 있다
  - 유저가 정의한 맵과 리듀스라는 함수 한 쌍으로 이루어진 맵 리듀스 페이즈를 한번 수행하거나 여러 번 반복 수행 할 수 있다.
  - 한번의 맵리듀스 페이즈는 맵 함수를 먼저 호출하고 그 다음에 리듀스 함수를 호출 하는데 때에 따라서 맵 함수가 끝난 후에 컴바인 함수를 중간에 수행할 수 있다
  - 드라이버에 해당하는 메인 프로그램에서 맵 리듀스 페이즈를 수행시킨다.

- MapReduce Programming Model
  - 함수형 프로그래밍 언어의 형태
  - 유저는 아래 3가지 함수를 구현해서 제공
    - Main
    - Map : 함수(key1, val1) -> [(key2, val2)]
    - Reduce : 함수(key1, [val1] -> [(key2, val2)])
- MapReduce Pahse
  - 맵 페이즈
    - 제일 먼저 수행되며 데이터의 여러 파티션에 병렬 분산으로 호출되어 수행
    - 각 머신마다 수행된 Mapper는 맵 함수가 입력 데이터의 한줄마다 맵함수를 호출
    - 맵 함수는 (key, value)쌍 형태로 결과를 출력하고, 여러 머신에 나누어 보내며 같은 key를 가진 (key, value)쌍은 같은 머신으로 보냄
  - 셔플링 페이즈
    - 모든 머신에서 맵 페이즈가 끝나면 시작
    - 맵 페이즈에서 각각의 머신으로 보내진 (key, value)쌍을 key를 이용해서 정렬을 한 후에 각각의 key 마다 같은 key를 가진 (key, value)쌍을 모아서 밸류-리스트(value-list)를 만든 다음에 (key, value-list) 형태로 key에 따라서 여러 머신에 분산해서 보냄
  - 리듀스 페이즈
    - 모든 머신에서 셔플링 페이즈가 다 끝나면 각 머신마다 리듀스 페이즈가 시작
    - 셔플링 페이즈에서 해당 머신으로 보내진 각각의 (key, value-list)쌍 마다 리듀스 함수가 호출되며 하나의 리듀스 함수가 끝나면 다음 (key, value-list)쌍에 리듀스 함추가 호출
    - 출력이 있다면 (key, value)쌍 형태로 출력 



## Hadoop

- Apache 프로젝트의 맵리듀스 프레임워크의 오픈 소스
- 하둡 분산 파일 시스템(Hadoop Distributed File System -HDFS)
  - 빅 데이터 파일을 여러 대의 컴퓨터에 나누어서 저장
  - 각 파일은 여러 개의 순차적인 블록으로 저장
  - 하나의 파일에서 각각의 블록은 폴트 톨러런스(fault tolerance)를 위해서 여러 개로 복사되어 여러 머신의 여기적에 저장
    - fault-tolerance : 시스템을 구성하는 부품의 일부에서 결함 또는 고장이 발생하여도 정상적/ 부분적으로 기능을 수행할 수 있는 것
  - 빅 데이터를 수천 대의 값싼 컴퓨터에 병렬 처리하기 위해 분산

- 구성 요소
  - MapReduce - 소프트웨어의 수행을 분산
  - Haddop Distributede File System(HDFS) - 데이터를 분산
  - 한 개의 Namenode(master)와 여러 개의 Datanode(slaves)
    - Namenode : 파일 시스템을 관리하고 클라이언트가 파일에 접근할 수 있게 함
    - Datanode : 컴퓨터에 들어있는 데이터를 접근할 수 있게 함
  - 자바 프로그래밍 언어로 맵리듀스 알고리즘을 구현

### MapReduce

- 맵 함수
  - org.apache.hadoop.mapreduce라는 패키지에 있는 Mapper 클래스를 상속받아서 맵 메소드를 수정
  - 입력 텍스트 파일에서 라인 단위로 호출되고 입력은 키-밸류(key, value-list)의 형태
  - key는 입력 텍스트 파일에서 맨 앞 문자를 기준으로 맵 함수가 호출된 해당 라인의 첫 번째 문자까지 오프셋
  - value는 텍스트의 해당 라인 전체가 들어있다.
- 리듀스 함수
  - org.apache.hadoop.mapreduce라는 패키지에 있는 Reducer 클래스를 상속받아서 reduce 메소드를 수정
  - 셔플링 페이즈의 출력을 입력으로 받는데 (key, value-list)의 형태
  - value-list는 맵 함수의 출력에서 key를 갖는 (key, value)쌍들의 value들의 리스트
- 컴바인 함수
  - 리듀스 함수와 유사한 함수인데 각 머신에서 맵 페이즈에서 맵 함수의 출력 크기를 줄여서 셔플링 페이즈와 리듀스 페이즈의 비용을 줄여주는데 사용
  - Map 함수의 결과 크기를 줄여준다
  - 각각의 머신에서 Reduce함수를 이용하는 것처럼 수행
  - 셔플링 비용 감소
  - 사용하는 것을 권장



### 정리

- Mapper and Reducer
  - 각 머신에서 독립적으로 수행
  - Mapper는 Map함수를 Reducer는 Reduce함수를 각각 수행
- Combine functions
  - 각 머신에서 Map함수가 끝난 다음에 Reduce 함수가 하는 일을 부분적으로 수행
  - 셔플링 비용과 네트웍 트래픽을 감소 시킴
- Mapper와 Reducer는 필요하다면 setup() and cleanup()을 수행할 수 있다.
  - setup() : 첫 Map 함수나 Reduce 함수가 호출되기 전에 맨 먼저 수행
    - 모듬 Map함수들에게 Broadcats해서 전달해야 할 파라미터들 정보를 Main함수에서 받아오는데 사용
    - 모든 Map함수들이 공유하는 자료구조를 초기화 하는데 사용
  - cleanup() : 마지막 Map함수나 Reduce함수가 끝나고 나면 수행
    - 모든 Map함수들이 공유하는 자료구조의 결과를 출력하는데 사용
- 한 개의 MapReduce job을 수행할 때에 Map 페이즈만 수행하고 중단 할 수도 있다.



## Installing VMware, Ubuntu and Hadoop

- 개발 환경 구성(Window 기준)

  - [VMware 설치](https://www.vmware.com/products/workstation-player.html)
  - [Ubunut 설치](https://ubuntu.com/download/desktop)
  - [Hadoop 설치](http://kdd.snu.ac.kr/home/)

  ```
  $ wget http://kdd.snu.ac.kr/~kddlab/Project.tar.gz
  $ tar zxf Project.tar.gz => 디렉토리가 만들어져서 풀림
  $ sudo chown –R hadoop:hadoop Project
  $ cd Project
  $ sudo mv hadoop-3.2.2 /usr/local/hadoop
  $ sudo apt update
  $ sudo apt install ssh openjdk-8-jdk ant -y
  $ ./set_hadoop_env.sh
  $ source ~/.bashrc
  
  ```

  

