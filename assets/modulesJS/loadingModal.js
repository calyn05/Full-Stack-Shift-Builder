// Loading modal circle animation -

export const loadingModal = function () {
  const loadingModal = document.querySelector(".loading-circle__modal");
  const loadingText = document.querySelector(".loading-circle__percentage");

  loadingModal.setAttribute("aria-hidden", false);

  const domLoadingTime = () => {
    const perfEntries = performance.getEntriesByType("navigation");
    const domTimeComplete = perfEntries[0].domComplete;
    return domTimeComplete;
  };

  const root = document.documentElement;
  root.style.setProperty(
    "--first-half-circle-timer",
    domLoadingTime() / 1000 / 2 + "s"
  );
  root.style.setProperty(
    "--second-half-circle-timer",
    domLoadingTime() / 1000 + "s"
  );

  const percentageInterval = () => {
    const perfEntries = performance.getEntriesByType("navigation");
    const domTimeComplete = domLoadingTime();
    const domTimeLoad = perfEntries[0].loadEventEnd;
    const percentageInt = (domTimeComplete - domTimeLoad) / 100;
    return percentageInt;
  };

  setTimeout(() => {
    loadingModal.setAttribute("aria-hidden", true);
    loadingModal.setAttribute("hidden", true);
  }, domLoadingTime());

  let percentage = 0;
  const interval = setInterval(() => {
    percentage += 1;
    loadingText.innerHTML = `${percentage}%`;
    if (percentage === 100) {
      clearInterval(interval);
    }
  }, percentageInterval());
};
