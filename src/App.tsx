import "./styles.css";
import DraggableList from "./components/DraggableList";

const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

export default function App() {
  return (
    <div>
      <h1>Draggable List</h1>
      <DraggableList items={items} />
    </div>
  );
}
