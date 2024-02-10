import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.function.Consumer;
import javax.swing.JTable;

class StudentMouseListener extends MouseAdapter {
    private final JTable table;
    private final Consumer<Integer> studentClickListener;

    public StudentMouseListener(JTable table, Consumer<Integer> studentClickListener) {
        this.table = table;
        this.studentClickListener = studentClickListener;
    }

    @Override
    public void mouseClicked(MouseEvent e) {
        int row = table.rowAtPoint(e.getPoint());
        int column = table.columnAtPoint(e.getPoint());
        if (row >= 0 && column >= 0) {
            int idStudent = (int) table.getValueAt(row, column);
            studentClickListener.accept(idStudent);
        }
    }
}
