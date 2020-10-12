const router = require('express').Router({ mergeParams: true });
const taskService = require('./tasks.service');

router.route('/').get(async (req, res) => {
  const boardId = req.params.boardId;
  const tasks = await taskService.getAll(boardId);
  res.status(200).json(tasks);
});
router.route('/:id').get(async (req, res) => {
  const boardId = req.params.boardId;
  const taskID = req.params.id;
  const task = await taskService.getTask(boardId, taskID);
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).send('cannot find task');
  }
});

router.route('/').post(async (req, res) => {
  const boardId = req.params.boardId;
  const task = await taskService.postTask(boardId, req.body);
  res.status(200).json(task);
});
router.route('/:id').put(async (req, res) => {
  const boardId = req.params.boardId;
  const taskID = req.params.id;
  const body = req.body;
  const task = await taskService.changeTask(boardId, taskID, body);
  if (task) {
    res.status(200).json(task);
  } else res.status(404).json({});
});
router.route('/:id').delete(async (req, res) => {
  const boardId = req.params.boardId;
  const taskID = req.params.id;
  const deleted = await taskService.deleteTask(boardId, taskID);
  if (deleted) {
    res.status(204).json([]);
  } else res.status(404).json({});
});
module.exports = router;
