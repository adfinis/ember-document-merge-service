export default [
  {
    description: "Test 1",
    slug: "t1",
    file: new File(["{{ test }}"], "t1.docx", { type: "text/plain" })
  },
  {
    description: "Test 2",
    slug: "t2",
    file: new File(["{{ test }}"], "t2.docx", { type: "text/plain" })
  },
  {
    description: "Test 3",
    slug: "t3",
    file: new File(["{{ test }}"], "t3.docx", { type: "text/plain" })
  }
];
