import { inject, observer } from "mobx-react";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import * as React from "react";
import { CommentModel, FileModel } from "../../models/ApiModels";
import { ApplicationStore } from "../../stores/applicationStore";
import { Comment } from "../Comment";
import { FileIsUploaded } from "../FileIsUploaded";
import { ShowNew } from "../ShowNew";
import * as TimelineCss from "./style.css";
import { detectVisibility } from "../../stores/detectVisibility";

interface IProps {}

interface IInjectedProps {
  applicationStore: ApplicationStore;
}

@inject("applicationStore")
@observer
export class Timeline extends React.Component<IProps> {
  get injected() {
    return this.props as IInjectedProps;
  }

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
		this.injected.applicationStore.getActivities();
	
		document.addEventListener("scroll", this.injected.applicationStore.trackScrolling);
	}
	
	componentWillUnmount(){
		document.removeEventListener("scroll", this.injected.applicationStore.trackScrolling);
	}

  public render() {
    return (
      <div>
        <h2>Timeline</h2>
				<div className={TimelineCss.timeline} id="timeline">
          <ShowNew />
          {this.injected.applicationStore.activities.map(item =>
            item.type === "comment" ? (
              <Comment key={item.idNew} comment={item as CommentModel} />
            ) : (
              <FileIsUploaded key={item.idNew} file={item as FileModel} />
            )
          )}
          {this.injected.applicationStore.isLoadingActivities && (
						<div className={TimelineCss.spinner}>
							<Spinner
								size={SpinnerSize.large}
								label="Loading older events..."
								ariaLive="assertive"
							/>
						</div>
          )}
        </div>
      </div>
    );
  }
}
