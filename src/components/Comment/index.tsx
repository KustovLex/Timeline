import * as React from "react";
import * as ItemCss from "../../assets/item.css";
import * as CommentCss from "./index.css";
import { CommentModel } from "../../models/ApiModels";
import { CommentViewModel } from "./viewModel";
import { observer, inject } from "mobx-react";
import VisibilitySensor from "react-visibility-sensor";
import moment from "moment";
import { detectVisibility } from "../../stores/detectVisibility";
import { ApplicationStore } from "../../stores/applicationStore";
 
interface IProps {
  comment: CommentModel;
}

interface IInjectedProps {
	applicationStore: ApplicationStore;
}

@inject("applicationStore")
@observer
export class Comment extends React.Component<IProps> {
	viewModel: CommentViewModel;
	
	get injected() {
		return this.props as unknown as IInjectedProps;
	}

  constructor(props: IProps) {
    super(props);

    this.viewModel = new CommentViewModel(this.props.comment);
  }

  componentDidMount() {
    detectVisibility(this.injected.applicationStore);
  }

  public render() {
    return (
      <div
        className={`${ItemCss.item} ${CommentCss.root} timeline-item`}
        data-highlight={this.viewModel.comment.highlighted ? "true" : null}
      >
        <img src={this.viewModel.user.avatar} className={CommentCss.avatar} />
        <div>
          <a href="#">{this.viewModel.user.name}</a> commented{" "}
          <a href="#">{this.viewModel.file.name}</a>{" "}
          {moment(this.viewModel.comment.date).format("hh:mm d/MM/YYYY")}
        </div>
        <div className={CommentCss.text}>{this.viewModel.comment.text}</div>
      </div>
    );
  }
}
