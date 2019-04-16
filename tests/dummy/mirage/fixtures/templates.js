export default [
  {
    description: "Test 1",
    slug: "t1",
    engine: "docx-template",
    file: new File(["{{ test }}"], "t1.docx", {
      type: "application/octet-stream"
    })
  },
  {
    description: "Test 2",
    slug: "t2",
    engine: "docx-template",
    file: new File(["{{ test }}"], "t2.docx", {
      type: "application/octet-stream"
    })
  },
  {
    description: "Test 3",
    slug: "t3",
    engine: "docx-template",
    file: new File(["{{ test }}"], "t3.docx", {
      type: "application/octet-stream"
    })
  }
];
