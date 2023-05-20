import { DatePicker, Space } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

const DateSelector = ({ onChange }) => {
  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  const disabledDate = (current) => {
    // Disable dates before today
    return current && current < moment().endOf("day");
  };

  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        showTime={{
          format: "HH:mm",
        }}
        size="large"
        format="YYYY-MM-DD HH:mm"
        onChange={onChange}
        onOk={onOk}
        disabledDate={disabledDate} // Add the disabledDate prop
      />
    </Space>
  );
};

export default DateSelector;
