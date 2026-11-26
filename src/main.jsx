
 // استيراد ملف التنسيقات CSS
import './App.css'

// استيراد createRoot لعرض تطبيق React داخل HTML
import { createRoot } from 'react-dom/client'

// استيراد Hooks من React
import { useState, useRef } from 'react'


// =========================
// المكون الرئيسي للتطبيق
// =========================
function Main() {

  // تخزين قائمة المهام وإدارة تحديثها
  const [todos, setTodos] = useState([]);

  // إنشاء مرجع للوصول إلى حقل الإدخال
  const inputRef = useRef();


  // =========================
  // إضافة مهمة جديدة
  // =========================
  const addTodo = () => {

    // الحصول على النص المكتوب داخل حقل الإدخال
    const newTodo = inputRef.current.value;

    // منع إضافة مهمة فارغة
    if (newTodo.trim() === '') return;

    // إضافة المهمة الجديدة إلى قائمة المهام
    setTodos([...todos, {
      text: newTodo,
      completed: false
    }]);

    // تفريغ حقل الإدخال بعد الإضافة
    inputRef.current.value = '';
  }


  // =========================
  // تغيير حالة المهمة (مكتملة / غير مكتملة)
  // =========================
  const completeTodo = (index) => {

    // إنشاء نسخة جديدة من قائمة المهام
    const newTodos = [...todos];

    // عكس حالة المهمة المحددة
    newTodos[index].completed = !newTodos[index].completed;

    // تحديث قائمة المهام
    setTodos(newTodos);
  }


  // =========================
  // حذف مهمة من القائمة
  // =========================
  const deleteTodo = (index) => {

    // إنشاء قائمة جديدة بدون المهمة المحددة
    const newTodos = todos.filter((item, i) => i !== index);

    // تحديث قائمة المهام بعد الحذف
    setTodos(newTodos);
  }


  // =========================
  // واجهة المستخدم (JSX)
  // =========================
  return (

    // الحاوية الرئيسية للصفحة
    <div className="main">

      {/* حاوية قائمة المهام */}
      <div className="to-do-container">

        {/* عنوان التطبيق */}
        <h1>To Do app</h1>

        {/* وصف حقل الإدخال */}
        <p>Add a new task</p>


        {/* =========================
            حقل الإدخال وزر الإضافة
        ========================= */}
        <div className="input-group">

          {/* حقل كتابة المهمة */}
          <input
            type="text"
            placeholder="Add a new task"
            ref={inputRef}
          />

          {/* زر إضافة المهمة */}
          <button className="add-btn" onClick={addTodo}>
            Add
          </button>

        </div>


        {/* =========================
            عرض قائمة المهام
        ========================= */}
        <ul>

          {/* المرور على جميع المهام وعرض كل مهمة */}
          {todos.map((item, index) => {

            return (

              // عنصر يمثل مهمة واحدة
              <li
                key={index}
                className="todo-item"
                onClick={() => completeTodo(index)}
              >

                {/* عرض نص المهمة وتحديد حالة إكمالها */}
                <span className={item.completed ? "done" : ""}>
                  {item.text}
                </span>


                {/* زر حذف المهمة */}
                <button
                  className="delete-btn"
                  onClick={(e) => {

                    // منع الضغط على زر الحذف من تشغيل حدث إكمال المهمة
                    e.stopPropagation();

                    // حذف المهمة المحددة
                    deleteTodo(index);
                  }}
                >
                  Delete
                </button>

              </li>
            )
          })}

        </ul>

      </div>

    </div>
  )
}


// =========================
// تشغيل تطبيق React
// =========================

// تحديد عنصر root داخل ملف HTML
// ثم عرض المكون Main بداخله
createRoot(document.getElementById('root')).render(
  <Main />
)
