import { Activity, ActivityType } from "@prisma/client";
import { useEffect, useState } from "react";
import ActivityCard from "./activity-card";

export type ActivityPayload = Activity & {
  type: ActivityType;
};

type TagObject = {
  name: string;
  description: string;
};

type TagsData = TagObject[];

interface IActivityTabProps {
  activities: ActivityPayload[];
}

const ActivitiesTab = (props: IActivityTabProps) => {
  const [tabs, setTabs] = useState<TagsData>([]);
  const [indexedData, setIndexedData] = useState<Activity[][]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    let tabsMetaHolder: TagObject[] = [];
    let tagsChecked: string[] = [];
    let collectDataByIndex: any[] = [];

    for (let i = 0; i < props.activities.length; i++) {
      const indexOfTag = tagsChecked.indexOf(props.activities[i].type.name);
      if (indexOfTag === -1) {
        const payload: TagObject = {
          name: props.activities[i].type.name,
          description: props.activities[i].type.description,
        };
        tabsMetaHolder.push(payload);
        tagsChecked.push(props.activities[i].type.name);
        collectDataByIndex.push([props.activities[i]]);
      } else {
        const existingDataArray: Activity[] = collectDataByIndex[indexOfTag];
        existingDataArray.push(props.activities[i]);
        collectDataByIndex[indexOfTag] = existingDataArray;
      }
    }

    setTabs(tabsMetaHolder);
    setIndexedData(collectDataByIndex);
  }, [props.activities]);

  return (
    <article className="min-w-xl border-teal-100 border-2 rounded-xl p-8 mt-12">
      {tabs.map((tab, index) => (
        <span
          key={tab.name + "_tab" + index}
          className={
            "mx-2 cursor-pointer hover:bg-teal-900 rounded-tl-xl rounded-tr-xl px-3 pt-1 pb-1 bg-teal-800"
          }
          onClick={() => setCurrentIndex(index)}
        >
          {tab.name}
        </span>
      ))}
      <div className="border-2 border-teal-800 p-6">
        {/* //! This should be moved into separate component */}
        {indexedData.length > 0 ? (
          indexedData[currentIndex].map((activity) => (
            <ActivityCard activity={activity} key={activity.id} />
          ))
        ) : (
          <>No data to display</>
        )}
      </div>
    </article>
  );
};

export default ActivitiesTab;
