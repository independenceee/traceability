import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

type Props = {
  data: Array<Record<string, string>>;
};
const Timeline = ({ data }: Props) => {
  return (
    <VerticalTimeline>
      {data.map((metadata, index) => (
        <VerticalTimelineElement
          key={index}
          date={`NFT #${index + 1}`}
          contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid rgb(33, 150, 243)" }}
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        >
          <h3 className="vertical-timeline-element-title">{metadata?.name}</h3>
          <ul>
            {Object.entries(metadata).map(
              ([key, value]) =>
                key !== "image" && (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ),
            )}
          </ul>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
};

export default Timeline;
