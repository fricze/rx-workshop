import Intent from './intent';
import View from './view';
import Model from './model';
import Renderer from './renderer';

Renderer.observe(View);

View.observe(Model);
Model.observe(Intent);
Intent.observe(View);
