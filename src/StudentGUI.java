import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.*;

public class StudentGUI extends JFrame {
    private JButton zobrazitButton;
    private JButton pridejPredmetButton;
    private JButton zobrazitPredmetButton;
    private JButton zobrazitHodnoceniButton; // Nové tlačítko pro zobrazení hodnocení
    private JTable table;
    private DefaultTableModel tableModel;
    private JPanel panel;
    private JPanel currentPanel;

    public StudentGUI() {
        setTitle("Správa Studentů");
        setSize(600, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        panel = new JPanel();
        panel.setLayout(new BorderLayout());

        JToolBar toolBar = new JToolBar();
        toolBar.setFloatable(false);

        Object[] options = {"Admin", "Host"};
        int selection = JOptionPane.showOptionDialog(null, "Vyberte roli", "Vyberte roli", JOptionPane.DEFAULT_OPTION, JOptionPane.QUESTION_MESSAGE, null, options, options[0]);

        if (selection == 0) { // Admin
            if (prihlasitAdmina()) {
                zobrazitButton = new JButton("Zobrazit studenty");
                zobrazitButton.addActionListener(new ActionListener() {
                    @Override
                    public void actionPerformed(ActionEvent e) {
                        zobrazitStudenty();
                    }
                });
                toolBar.add(zobrazitButton);

                pridejPredmetButton = new JButton("Přidej předmět");
                pridejPredmetButton.addActionListener(new ActionListener() {
                    @Override
                    public void actionPerformed(ActionEvent e) {
                        pridejPredmet();
                    }
                });
                toolBar.add(pridejPredmetButton);
            } else {
                System.exit(0);
            }
        } else if (selection == 1) { // Host
            zobrazitButton = new JButton("Zobrazit studenty");
            zobrazitButton.addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    zobrazitStudenty();
                }
            });
            toolBar.add(zobrazitButton);
        }

        zobrazitPredmetButton = new JButton("Zobrazit předměty");
        zobrazitPredmetButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                zobrazitPredmety();
            }
        });
        toolBar.add(zobrazitPredmetButton);

        // Přidání tlačítka pro zobrazení hodnocení
        zobrazitHodnoceniButton = new JButton("Zobrazit hodnocení");
        zobrazitHodnoceniButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                zobrazitHodnoceni();
            }
        });
        toolBar.add(zobrazitHodnoceniButton);

        panel.add(toolBar, BorderLayout.NORTH);
        currentPanel = panel;

        add(panel);
    }

    private boolean prihlasitAdmina() {
        JTextField usernameField = new JTextField();
        JPasswordField passwordField = new JPasswordField();
        Object[] message = {
                "Jméno:", usernameField,
                "Heslo:", passwordField
        };

        int option = JOptionPane.showConfirmDialog(null, message, "Přihlášení Admina", JOptionPane.OK_CANCEL_OPTION);
        if (option == JOptionPane.OK_OPTION) {
            String username = usernameField.getText();
            String password = new String(passwordField.getPassword());
            if (username.equals("admin") && password.equals("heslo")) {
                return true;
            } else {
                JOptionPane.showMessageDialog(null, "Neplatné jméno nebo heslo", "Chyba", JOptionPane.ERROR_MESSAGE);
                return false;
            }
        } else {
            return false;
        }
    }

    private void pridejPredmet() {
        String nazev = JOptionPane.showInputDialog("Zadejte název předmětu:");
        int id_kategorie = Integer.parseInt(JOptionPane.showInputDialog("Zadejte ID kategorie:"));
        String kod = JOptionPane.showInputDialog("Zadejte kód předmětu:");

        Connection connection = null;
        PreparedStatement preparedStatement = null;

        try {
            connection = DriverManager.getConnection(
                    "jdbc:mysql://127.0.0.1:3306/sprava_univerzitniho_systemu",
                    "root",
                    "heslo");

            connection.setAutoCommit(false);

            String insertQuery = "INSERT INTO Predmet (nazev, idkategorie, kod) VALUES (?, ?, ?)";
            preparedStatement = connection.prepareStatement(insertQuery);
            preparedStatement.setString(1, nazev);
            preparedStatement.setInt(2, id_kategorie);
            preparedStatement.setString(3, kod);

            preparedStatement.executeUpdate();

            connection.commit();

            JOptionPane.showMessageDialog(null, "Předmět byl úspěšně přidán.", "Úspěch", JOptionPane.INFORMATION_MESSAGE);
        } catch (SQLException ex) {
            try {
                if (connection != null) {
                    connection.rollback();
                }
            } catch (SQLException rollbackEx) {
                rollbackEx.printStackTrace();
            }
            ex.printStackTrace();
            JOptionPane.showMessageDialog(null, "Chyba při přidávání předmětu: " + ex.getMessage(), "Chyba", JOptionPane.ERROR_MESSAGE);
        } finally {
            try {
                if (preparedStatement != null) {
                    preparedStatement.close();
                }
                if (connection != null) {
                    connection.setAutoCommit(true);
                    connection.close();
                }
            } catch (SQLException closeEx) {
                closeEx.printStackTrace();
            }
        }
    }

    private void zobrazitPredmety() {
        try {
            Connection connection = DriverManager.getConnection(
                    "jdbc:mysql://127.0.0.1:3306/sprava_univerzitniho_systemu",
                    "root",
                    "heslo");

            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT Predmet.idpredmet, Predmet.nazev AS nazev_predmetu, Kategorie.nazev AS kategorie FROM Predmet INNER JOIN Kategorie ON Predmet.idkategorie = Kategorie.idkategorie ORDER BY Predmet.idpredmet");

            JPanel predmetyPanel = new JPanel();
            predmetyPanel.setLayout(new BorderLayout());

            tableModel = new DefaultTableModel();
            table = new JTable(tableModel);
            JScrollPane scrollPane = new JScrollPane(table);
            predmetyPanel.add(scrollPane, BorderLayout.CENTER);

            ResultSetMetaData metaData = resultSet.getMetaData();
            int columnCount = metaData.getColumnCount();

            String[] columns = new String[columnCount];
            for (int i = 1; i <= columnCount; i++) {
                columns[i - 1] = metaData.getColumnName(i);
            }
            columns[2] = "kategorie";
            tableModel.setColumnIdentifiers(columns);

            while (resultSet.next()) {
                Object[] rowData = new Object[columnCount];
                for (int i = 1; i <= columnCount; i++) {
                    rowData[i - 1] = resultSet.getObject(i);
                }
                tableModel.addRow(rowData);
            }

            panel.remove(currentPanel);
            panel.add(predmetyPanel, BorderLayout.CENTER);
            currentPanel = predmetyPanel;
            panel.revalidate();
            panel.repaint();

            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private void zobrazitStudenty() {
        try {
            Connection connection = DriverManager.getConnection(
                    "jdbc:mysql://127.0.0.1:3306/sprava_univerzitniho_systemu",
                    "root",
                    "heslo");

            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM STUDENT");

            JPanel studentPanel = new JPanel();
            studentPanel.setLayout(new BorderLayout());

            tableModel = new DefaultTableModel();
            table = new JTable(tableModel);
            JScrollPane scrollPane = new JScrollPane(table);
            studentPanel.add(scrollPane, BorderLayout.CENTER);

            ResultSetMetaData metaData = resultSet.getMetaData();
            int columnCount = metaData.getColumnCount();

            String[] columns = new String[columnCount];
            for (int i = 1; i <= columnCount; i++) {
                columns[i - 1] = metaData.getColumnName(i);
            }
            tableModel.setColumnIdentifiers(columns);

            while (resultSet.next()) {
                Object[] rowData = new Object[columnCount];
                for (int i = 1; i <= columnCount; i++) {
                    rowData[i - 1] = resultSet.getObject(i);
                }
                tableModel.addRow(rowData);
            }

            panel.remove(currentPanel);
            panel.add(studentPanel, BorderLayout.CENTER);
            currentPanel = studentPanel;
            panel.revalidate();
            panel.repaint();

            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Metoda pro zobrazení hodnocení
    private void zobrazitHodnoceni() {
        try {
            Connection connection = DriverManager.getConnection(
                    "jdbc:mysql://127.0.0.1:3306/sprava_univerzitniho_systemu",
                    "root",
                    "heslo");

            int id_student = Integer.parseInt(JOptionPane.showInputDialog("Zadejte ID studenta:"));

            String query = "SELECT Student.idstudent, Student.jmeno, Student.prijmeni, Hodnoceni.idzkouska, Hodnoceni.hodnoceni " +
                    "FROM Student " +
                    "INNER JOIN Hodnoceni ON Student.idstudent = Hodnoceni.idstudent " +
                    "WHERE Student.idstudent = ?";

            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setInt(1, id_student);
            ResultSet resultSet = preparedStatement.executeQuery();

            JPanel hodnoceniPanel = new JPanel();
            hodnoceniPanel.setLayout(new BorderLayout());

            // Vytvoření panelu pro zobrazení dat studenta
            JPanel infoPanel = new JPanel();
            JLabel infoLabel = new JLabel();
            infoLabel.setFont(new Font("Arial", Font.PLAIN, 16)); // Nastavení velikosti písma
            infoPanel.add(infoLabel);
            hodnoceniPanel.add(infoPanel, BorderLayout.NORTH);

            // Vytvoření tabulky pro zobrazení hodnocení
            DefaultTableModel tableModel = new DefaultTableModel();
            JTable table = new JTable(tableModel);
            JScrollPane scrollPane = new JScrollPane(table);
            hodnoceniPanel.add(scrollPane, BorderLayout.CENTER);

            tableModel.addColumn("ID zkoušky");
            tableModel.addColumn("Hodnocení");

            if (resultSet.next()) {
                infoLabel.setText("<html><center>ID studenta: " + id_student + "<br>Jméno: " + resultSet.getString("jmeno") + "<br>Příjmení: " + resultSet.getString("prijmeni") + "</center></html>");
                do {
                    Object[] rowData = {resultSet.getInt("idzkouska"), resultSet.getString("hodnoceni")};
                    tableModel.addRow(rowData);
                } while (resultSet.next());
            } else {
                infoLabel.setText("<html><center>ID studenta: " + id_student + "<br>Jméno: neznámé<br>Příjmení: neznámé</center></html>");
            }

            panel.remove(currentPanel);
            panel.add(hodnoceniPanel, BorderLayout.CENTER);
            currentPanel = hodnoceniPanel;
            panel.revalidate();
            panel.repaint();

            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }



    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                StudentGUI gui = new StudentGUI();
                gui.setVisible(true);
            }
        });
    }
}
