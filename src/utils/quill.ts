const quillToolbarConfig = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
  ],
};

const addAccessibilityAttributes = (): void => {
  const buttons: string[] = [
    "ql-bold",
    "ql-italic",
    "ql-underline",
    "ql-strike",
    "ql-blockquote",
    "ql-list",
    "ql-link",
  ];

  buttons.forEach((button) => {
    const currentButtons = document.querySelectorAll(`.${button}`);

    if (button.includes("ql-list")) {
      currentButtons.forEach((list, index) => {
        if (index === 0) {
          list.setAttribute("aria-label", "Ordered list");
        } else {
          list.setAttribute("aria-label", "Unordered list");
        }
      });
      return;
    }

    currentButtons.forEach((currentButton) => {
      switch (button) {
        case "ql-bold":
          currentButton?.setAttribute("aria-label", "Bold text");
          break;
        case "ql-italic":
          currentButton?.setAttribute("aria-label", "Italic text");
          break;
        case "ql-underline":
          currentButton?.setAttribute("aria-label", "Underline text");
          break;
        case "ql-strike":
          currentButton?.setAttribute("aria-label", "Strike through text");
          break;
        case "ql-blockquote":
          currentButton?.setAttribute("aria-label", "Blockquote");
          break;
        case "ql-link":
          currentButton?.setAttribute("aria-label", "Insert link");
          break;
        default:
          break;
      }
    });
  });
};

export { quillToolbarConfig, addAccessibilityAttributes };
