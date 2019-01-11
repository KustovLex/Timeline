import { ApplicationStore } from "./applicationStore";

export function detectVisibility(applicationStore: ApplicationStore) {
  var cumulativeTop = function(element) {
    let top = 0;
    do {
      top += element.offsetTop || 0;
      element = element.offsetParent;
    } while (element);

    return top;
  };

  var timeline = document.querySelector("#timeline");
  var elements = timeline.querySelectorAll(".timeline-item");
  elements.forEach((el, i) => {
    if (
      window.pageYOffset <= cumulativeTop(el) &&
      window.innerHeight + window.pageYOffset >= cumulativeTop(el) + el.clientHeight
    ) {
      if (applicationStore.activities[i].timer === undefined && applicationStore.activities[i].highlighted) {
        applicationStore.activities[i].timer = setTimeout(() => {
          applicationStore.activities[i].highlighted = false;
        }, 5000);
      }
    }
  });
}
