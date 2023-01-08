import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import './App.css';
import DataTableBasic from './component/home';
import CkEditor from './component/CkEditor';
function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="App flex flex-column justify-content-center align-content-center">
      <div className="card">
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
          <TabPanel header="Header I">
            <DataTableBasic/>
          </TabPanel>
          <TabPanel header="Header II">
            <CkEditor></CkEditor>
          </TabPanel>
          <TabPanel header="Header III">
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
              cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
              Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.</p>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
}

export default App;
