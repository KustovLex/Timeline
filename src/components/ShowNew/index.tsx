import { inject, observer } from "mobx-react";
import * as React from "react";
import * as ItemCss from "../../assets/item.css";
import { ApplicationStore } from "../../stores/applicationStore";
import * as css from "./style.css";
import { ShowNewViewModel } from "./viewModel";

interface IProps {}

interface IInjectedProps {
  applicationStore: ApplicationStore;
}

@inject("applicationStore")
@observer
export class ShowNew extends React.Component<IProps> {
  viewModel: ShowNewViewModel;

  get injected() {
    return this.props as IInjectedProps;
  }

  constructor(props) {
    super(props);

		this.viewModel = new ShowNewViewModel(this.injected.applicationStore);
  }

  displayNew = () => {
		this.viewModel.displayNew();
	};

  componentDidMount() {
    this.viewModel.subscribe();
  }

  componentWillUnmount() {
    this.viewModel.unsubscribe();
  }

  public render() {
    return <div className={`${ItemCss.item} ${css.root}`}>
        <button className={css.button} onClick={() => this.displayNew()}>
          {this.viewModel.count > 0 ? `Load new ${this.viewModel.count} activities` : "..."}
        </button>
        <div className={css.line} />
      </div>;
  }
}
