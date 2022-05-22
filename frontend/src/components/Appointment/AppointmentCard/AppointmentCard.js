import "./AppointmentCard.css";
import { Tag, TagLabel, Button } from "@chakra-ui/react";
import moment from "moment";
const AppointmentCard = ({ data }) => {
  return (
    <>
      <div
        style={{
          width: "300px",
          boxShadow: "1px 2px 9px rgba(15, 15, 15, 0.76)",
          padding: "10px",
          marginTop: "10px",
        }}
      >
        <div className="appCardDiv1">
          <p className="fwb">{data.name}</p>
          {data.symptoms.map((each, idx) => (
            <Tag
              key={idx}
              size="md"
              variant="outline"
              m="5px 0 0 5px"
              sx={{ border: "1px solid #2196f3" }}
            >
              <TagLabel color="#2196f3">{each}</TagLabel>
            </Tag>
          ))}
        </div>
        <div className="dFlexWrap justEven mt-1 mb-1">
          <p className="appCardContact">{data.mobile}</p>
          <p className="appCardContact">{data.email}</p>
          <Button
            size="xs"
            bg="#aeea00"
            color="#fff"
            sx={{
              _hover: {
                bg: "#fff",
                color: "#aeea00",
                border: "1px solid #aeea00",
              },
            }}
          >
            Join Call
          </Button>
        </div>
        <p className="appCardDate">{moment(data.datetime).format("LLLL")}</p>
      </div>
    </>
  );
};

export default AppointmentCard;
