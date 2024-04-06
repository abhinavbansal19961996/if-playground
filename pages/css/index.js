export const css = `
.container {
  display: flex;
  height: 100vh;
  background-color: #1e1e1e;
  color: #fff;
}
.sidebar {
  width: 200px;
  padding: 20px;
  background-color: #242424;
}
.text-container {
  margin: 10px;
}
.tter {
  height: 90%
}
.main-content {
  flex: 1;
  display: flex;
}
.row-list {
  margin-bottom: 20px;
}
.row {
  cursor: pointer;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
.row:hover {
  background-color: #333;
}
.input-container {
  flex: 1;
  padding: 20px;
  padding-top: 0px;
}
textarea {
  width: 100%;
  height: 200px;
  padding: 10px;
  border: 1px solid #555;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  resize: none;
  margin-bottom: 20px;
}
.input-container-run {
  width: 30%;
  height: 35px;
  margin-left: 500px;
  margin-top: 15px;
  
}
button {
  display: block;
  width: 100%;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #0056b3;
}
.sdsdsds {
  padding-top: 30px;
}
.output-graph-container {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.output-container {
  min-height: 50%;
  flex: 1;
  width: 100%;
}
.ffolp {
  display: flex;
}
.output-container textarea {
  height: 90%; /* Half of container height */
  margin-bottom: 20px;
}
.sjddj {
  margin-top: 48px;
        }
.graph-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}
.graph-nav {
  display: flex;
  justify-content: space-between;
}
`;