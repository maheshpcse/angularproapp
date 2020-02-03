import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  public data: any = [];

  selectedEntities: any[];

  token = localStorage.getItem('token');
  task_id: any;
  title: any;
  description: any;
  status: any;
  user_id: any;
  date: any;

  constructor(
    private route: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.data = [
      { name: 'John', email: 'john123@gmail.com', age: 24, city: 'Australia' },
      { name: 'David', email: 'david.420@gmail.com', age: 28, city: 'Canada' },
      { name: 'Sam', email: 'sam599sung@gmail.com', age: 27, city: 'England' },
      { name: 'Charlin', email: 'charlin.chars123@gmail.com', age: 22, city: 'Japan' },
      { name: 'Rishi', email: 'rishi.rocks123@gmail.com', age: 23, city: 'India' },
      { name: 'Kingston', email: 'king1ston@gmail.com', age: 29, city: 'China' }
    ]
    this.getAllTasks();
  }

  public setSelectedEntities($event: any) {
    this.selectedEntities = $event;
  }


  tasksArr: any = [];

  getAllTasks() {
    this.sharedService.getAllTasks().subscribe(res => {
      this.tasksArr = res['data'];
    })
  }

  getTaskid(taskid, userid, action) {
    if (action == 'edit') {
      document.getElementById('id01').style.display = 'block';
      this.task_id = taskid;
      this.user_id = userid;
    } else {
      document.getElementById('id02').style.display = 'block';
      this.task_id = taskid;
    }
    console.log("task id is:", this.task_id);
    console.log("user id is:", this.user_id);
  }

  updateTask() {
    let taskData = {
      task_id: this.task_id,
      title: this.title,
      description: this.description,
      is_complete: this.status,
      user_id: this.user_id,
      date: this.date
    }
    this.sharedService.updateTask(taskData).subscribe(res => {
      if (res['success'] == true) {
        console.log("Task updated successful");
        document.getElementById('id01').style.display = 'none';
        this.route.navigate(['/tables']);
      } else {
        console.log("Failed to updated task");
        document.getElementById('id01').style.display = 'none';
        this.route.navigate(['/tables']);
      }
    })
  }

  deleteTask() {
    let taskData = {
      task_id: this.task_id
    }
    this.sharedService.deleteTask(taskData).subscribe(res => {
      if (res['success'] == true) {
        console.log("Task delete successful");
        document.getElementById('id02').style.display = 'none';
        this.route.navigate(['/tables']);
      } else {
        console.log("Failed to delete task");
        document.getElementById('id02').style.display = 'none';
        this.route.navigate(['/tables']);
      }
    })
  }

  downloadReport() {
    // this.sharedService.addDatatoDowload(this.tasksArr).subscribe(res => {
    //   console.log("File download succeessful");
    // })
    let keys = Object.keys(this.tasksArr[0]);
    var cell = [];
    for (let i = 0; i < keys.length; i++) {
      var cellStyle = {
        s: {
          font: { bold: true, underline: true, color: { rgb: "FFFFAA00" }, sz: 30 },
          alignment: { wrapText: true, autoWidth: true }
        }, v: keys[i]
      };
      cell.push(cellStyle);
    }
    const wscols = [];
    for (let i = 0; i< keys.length; i++) {
      let obj = {
        wch: keys[i].length + 5
      }
      wscols.push(obj);
    }
    // create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(this.tasksArr);
    ws['!cols'] = wscols;
    ws['!margins'] = { left: 0.25, right: 0.25, top: 0.75, bottom: 0.75, header: 0.3, footer: 0.3 };
    XLSX.utils.book_append_sheet(wb, ws, 'Tasks');
    XLSX.writeFile(wb, 'a.xlsx', { cellStyles: true });
  }
}
