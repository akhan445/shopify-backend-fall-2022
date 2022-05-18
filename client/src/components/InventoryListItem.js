import './InventoryList.css';

function InventoryListItem({ data }) {
  return (
    <tr key={data.id}>
      {Object.values(data).map((value, index) => <td key={index}>{value}</td>)}
    </tr>
  )
}

export default InventoryListItem;