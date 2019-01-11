import * as React from "react";

import * as ItemCss from "../../assets/item.css";
import * as FileCss from "./index.css";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/fontawesome-free-regular";
import { FileViewModel } from "./viewModel";
import { observer, inject } from "mobx-react";
import { FileModel } from "../../models/ApiModels";
import { ApplicationStore } from "../../stores/applicationStore";
import { detectVisibility } from "../../stores/detectVisibility";

interface IProps {
  file: FileModel;
}

interface IInjectedProps {
  applicationStore: ApplicationStore;
}

@inject("applicationStore")
@observer
export class FileIsUploaded extends React.Component<IProps> {
  viewModel: FileViewModel;

  get injected() {
    return (this.props as unknown) as IInjectedProps;
  }

  constructor(props) {
    super(props);

    this.viewModel = new FileViewModel(this.props.file);
  }

  componentDidMount() {
    detectVisibility(this.injected.applicationStore);
  }

  public render() {
    return (
      <div
        className={`${ItemCss.item} ${FileCss.root} timeline-item`}
        data-highlight={this.viewModel.file.highlighted ? "true" : null}
      >
        <div className={FileCss.icon}>
          <FontAwesomeIcon icon={faFileExcel} />
        </div>
        <div className={FileCss.content}>
          <div>
            File <a href="#">{this.viewModel.file.name}</a> was uploaded
          </div>

          <div className={FileCss.user}>
            <img src={this.viewModel.user.avatar} className={FileCss.avatar} />
            <div className={FileCss.userName}>
              <a href="#">{this.viewModel.user.name}</a>
            </div>
            <div className={FileCss.timestamp}>Created a few minutes ago</div>
          </div>
        </div>
      </div>
    );
  }
}
