import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const CalendarScreen = () => {
  const date = new Date();
  const monthFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  });
  const monthName = monthFormatter.format(date);
  const year = date.getFullYear(); // 2023
  const month = date.getMonth(); //1월 -> 0
  const lastDate = new Date(year, month + 1, 0).getDate(); //31 (1월 기준)
  const firstWeekday = new Date(year, month, 1).getDay(); //2023, 0, 1 -> 0 == 일요일
  const lastWeekday = new Date(year, month, lastDate).getDay(); //1월 31일 기준 화요일 -> 2
  const dates = []; // 현재 달의 전체 요일
  const prevDates = []; //이전 달의 요일인데 있을때만
  const nextDates = []; //다음 달의 요일인데 있을때만
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const styles = StyleSheet.create({
    blue: {
      color: "#109CF1",
    },
    red: {
      color: "red",
    },
    gray: {
      color: "lightgray",
    },
    headerView: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      paddingTop: 18,
      paddingLeft: 18,
      paddingRight: 18,
    },
    dateView: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      margin: "18px",
    },
    dayView: {
      display: "flex",
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: 50,
      height: 50,
    },
    checkToday: {
      border: "1px solid #109CF1",
      borderRadius: 50,
      padding: 5,
    },
  });

  //이전 달 요일 담기
  for (let i = 0; i < firstWeekday; i++) {
    const date = new Date(year, month, 0);
    date.setDate(date.getDate() - i);
    prevDates.unshift(date);
  }

  //현재 달 요일 담기
  for (let i = 1; i <= lastDate; i++) {
    dates.push(new Date(year, month, i));
  }

  //다음 달 요일 담기
  for (let i = 1; i <= 6 - lastWeekday; i++) {
    nextDates.push(new Date(year, month + 1, i));
  }

  const calendarDates = [...prevDates, ...dates, ...nextDates];

  const renderDates = (item) => {
    const renderYear = item.getFullYear();
    const renderMonth = item.getMonth();
    const renderDay = item.getDate();
    const today = new Date().getDate();

    if (renderMonth !== month) {
      return (
        <View style={styles.dayView}>
          <Text style={styles.gray}>{renderDay}</Text>
        </View>
      );
    } else if (today === renderDay && month === renderMonth) {
      return (
        <View style={styles.dayView}>
          <Text style={styles.checkToday}>{renderDay}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.dayView}>
          <Text>{renderDay}</Text>
        </View>
      );
    }
  };

  const previousMonth = () => {
    console.log("이전 달");
  };

  return (
    <View>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={previousMonth}>
          <AntDesign name="left" size={16} color="#109CF1" />
        </TouchableOpacity>
        <View>
          <Text>{monthName}</Text>
        </View>
        <TouchableOpacity>
          <AntDesign name="right" size={16} color="#109CF1" />
        </TouchableOpacity>
      </View>
      <View style={styles.dateView}>
        {weekdays.map((weekday, idx) => {
          if (weekday === "Sun") {
            return (
              <Text style={styles.red} key={idx}>
                {weekday}
              </Text>
            );
          } else if (weekday === "Sat") {
            return (
              <Text style={styles.blue} key={idx}>
                {weekday}
              </Text>
            );
          }
          return (
            <Text key={idx} style={styles.gray}>
              {weekday}
            </Text>
          );
        })}
      </View>
      <FlatList
        data={calendarDates}
        renderItem={(item) => renderDates(item.item)}
        numColumns={7}
        keyExtractor={(_, idx) => idx}
      />
    </View>
  );
};
