import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import * as _ from 'underscore';

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

  taskArray: any = [];

  getTaskid(taskid, userid, action) {
    if (action == 'edit') {
      document.getElementById('id01').style.display = 'block';
      this.task_id = taskid;
      this.user_id = userid;
      this.taskArray = _.filter(this.tasksArr, (o: any) => {
        return o.task_id == this.task_id;
      });
      console.log("task array list", this.taskArray);
      this.title = this.taskArray[0].title;
      this.description = this.taskArray[0].description;
      this.status = this.taskArray[0].status;
      this.date = this.taskArray[0].updated_at;
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
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(this.tasksArr);
    let keys = Object.keys(this.tasksArr[0]);
    const ws_name = 'Report';
    let a = [];
    let b = [];
    let e = [];
    let f = [];
    let g = [];
    for (let i = 0; i < this.tasksArr.length; i++) {
      a.push((this.tasksArr[i].title).length);
      b.push((this.tasksArr[i].description).length);
      e.push((this.tasksArr[i].username).length);
      f.push((this.tasksArr[i].created_at).length);
      g.push((this.tasksArr[i].updated_at).length);
    }
    const wscols = [
      { wch: 10 },
      { wch: Math.max.apply(Math, a) + 1 },
      { wch: Math.max.apply(Math, b) + 1 },
      { wch: 10 },
      { wch: 10 },
      { wch: Math.max.apply(Math, e) + 1 },
      { wch: Math.max.apply(Math, f) + 1 },
      { wch: Math.max.apply(Math, g) + 1 }
    ];
    ws['!cols'] = wscols;
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    const wbout = XLSX.write(wb, {
      type: 'binary',
      bookSST: true,
      bookType: 'xlsx',
      cellStyles: true
    });
    XLSX.writeFile(wb, 'a.xlsx')
  }
}
