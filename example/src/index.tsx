import { App } from '../../src';

const target = document.querySelector('.app')!;

const app = new App(target);
app.execute();
