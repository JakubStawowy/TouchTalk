import React from "react";
import { Route, HashRouter} from "react-router-dom";
import {  } from "module";
import "./Add_tasks.css";

const Add_tasks = () => {
    return (
      <HashRouter>
        <section>
            <div class="container">
                <nav class="row">
                    <div class="nav-wrapper">
                        <span class="brand-logo center">Lista zadań</span>
                    </div>
                </nav>
                <div class="row">
                    <button class="btn col s2 offset-s10">Dodaj zadanie</button>
                    <button class="btn col s2 offset-s11">Zakończ</button>
                </div>
                <div class="row">
                    <input
                        class="col s8"
                        type="text"
                        placeholder="Dodaj zadanie i datę wykonania"
                    />
                    <input class="col s2 disabled" type="date" />
                    <button class="btn-floating">+</button>
                </div>
                <ul class="collection">
                    <li class="collection-item row">
                        <span class="col s10">1. Lab1 ZTPAI - 11.07 czwartek</span>
                        <div class="col s2 right-align">
                            <button class="btn-floating btn-small red">
                                <i class="material-icons">remove</i>
                            </button>
                            <button class="btn-floating btn-small green ml-5">
                                <i class="material-icons">check</i>
                            </button>
                        </div>
                    </li>
                </ul>
                <h1>Dzisiaj brak zadań :-)</h1>
                <button class="btn red">Wyczyść</button>
                <footer class="page-footer mt-5">
                    <div class="footer-copyright">
                        <div class="container1">
                            2021 © Lista zadań,All rights reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </section>
        </HashRouter>
    );
};

export default Add_tasks;
